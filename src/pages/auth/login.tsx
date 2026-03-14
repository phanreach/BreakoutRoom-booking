import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import Logo from "/src/assets/logo.png";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import useLogin from "../../components/hook/use-login";
import Cookies from "js-cookie";
import {
  loginSchema,
  type LoginSchema,
} from "../../components/lib/schema/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();

  const loginMutation = useLogin();
  const loading = loginMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    try {
      await loginMutation.mutateAsync(data);

      const role = Cookies.get("role");

      if (role?.includes("ADMIN")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch {
      // error handled in hook
    }
  };
  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://academics-bucket-sj19asxm-prod.s3.ap-southeast-1.amazonaws.com/c0455e1c-b56a-448f-ac79-89ce6acd3138/c41c22a4-93a5-4a23-8e13-6fed3d4e17a3.jpg"
          alt="University background"
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/60 to-transparent"></div>
      </div>

      <main className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8 justify-center flex flex-col items-center space-y-2">
            <img
              src={Logo}
              alt="Breakout Room Booking Logo"
              className="w-50 h-auto"
            />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Breakout Room
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Reserve your study space
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                University Email
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter CamTech email"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
              />
              <label className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                Remember this device
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-6 text-sm text-white/80 font-medium">
          <a href="#" className="hover:text-white transition-colors">
            Support
          </a>
          <span className="text-white/30">•</span>
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <span className="text-white/30">•</span>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </main>
    </div>
  );
}
