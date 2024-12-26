import Container from "@/layouts/user/components/Container.tsx";
import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "@/pages/login/api/authenticate.ts";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "@/common/constant.ts";

// Define validation schema
const formSchema = z.object({
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
});

export default function LoginPage() {
  const navigate = useNavigate();
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await authenticate(values);
      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000, // Tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.accessToken.token),
      );
      console.log("token", localStorage.getItem("token"));
      const token = localStorage.getItem("token");

      //socket-io
      if (token) {
        const socket = io(SOCKET_BASE_URL, {
          transports: ["websocket"],
        });
        socket.emit("authentication", {
          token: JSON.parse(token),
        });
        socket.on("authentication", (data) => {
          console.log("Đã xác thực thành công:", data);
        });
      }

      navigate("/");
      // Handle success (e.g., save token, navigate to dashboard)
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại!", {
        position: "top-right",
        autoClose: 3000, // Tự động đóng sau 3 giây
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
        <h1 className="flex justify-center text-2xl font-bold">
          Đăng nhập HIHOLIVE
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

            {/* Submit Button */}
            <Button className={"w-full"} type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <div className="text-center pt-5">
          <span>Bạn không có tài khoản? </span>
          <Link className={"underline"} to="/signup">
            Đăng ký
          </Link>
        </div>
      </div>
    </Container>
  );
}
