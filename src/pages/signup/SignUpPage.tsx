import Container from "@/layouts/user/components/Container.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/pages/signup/api/register.ts";
import { toast } from "react-toastify";
// Define validation schema
const formSchema = z
  .object({
    firstName: z.string().nonempty({ message: "Tên không được để trống." }),
    lastName: z.string().nonempty({ message: "Họ không được để trống." }),
    email: z.string().email({ message: "Email không hợp lệ." }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Gắn lỗi vào trường confirmPassword
  });

export const SignUpPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register(values);
      // Hiển thị thông báo thành công
      toast.success("Đăng ký thành công!", {
        position: "top-right",
        autoClose: 3000, // Tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
      // Xử lý khi đăng ký thành công (e.g., lưu token, chuyển hướng)
    } catch (error) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <Container className="h-screen  flex justify-center items-center bg-gray-200 bg-opacity-70">
      <div className="flex flex-col p-8 bg-white w-auto min-w-[500px] rounded">
        <h1 className="flex justify-center text-2xl font-bold pb-2">
          Tham gia HIHOLIVE ngay hôm nay
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Username Field */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button className={"w-full"} type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <div className="text-center pt-5">
          <span>Bạn có tài khoản? </span>
          <Link className={"underline"} to="/login">
            Đăng nhập
          </Link>
        </div>
      </div>
    </Container>
  );
};
