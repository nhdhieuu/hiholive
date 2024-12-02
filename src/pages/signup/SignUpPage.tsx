import Container from "@/layouts/components/Container.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
// Define validation schema
const formSchema = z.object({
    username: z.string().min(2,{ message: "Tên người dùng phải có từ 4 đến 25 ký tự.",}).max(20, {
        message: "Tên người dùng phải có từ 4 đến 25 ký tự.",
    }),
    password: z
        .string()
        .min(8, {
            message: "Mật khẩu phải có ít nhất 8 ký tự.\n",
        })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/\d/, { message: "Password must contain at least one number." }),
    dob: z.string(),
    email:z.string().email( {message: "Email không hợp lệ."}),
    phone:z.string().length(10, {message: "Phone number must be 10 digits."}),
});

export const SignUpPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            dob: "",
            email: "",
            phone: ""
        },
    });

    // Submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values); // Handle validated form values
    }
    return (
        <Container className="h-screen  flex justify-center items-center bg-gray-200 bg-opacity-70">
            <div className="flex flex-col p-8 bg-white w-auto min-w-[500px]">
                <h1 className="flex justify-center text-2xl font-bold pb-2">Tham gia HIHOLIVE ngay hôm nay</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {/* Username Field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên người dùng</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ngày sinh</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button className={"w-full"} type="submit">Submit</Button>
                    </form>
                </Form>
                <div className="text-center pt-5">
                    <span>Bạn có tài khoản? </span>
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </Container>
    );
}