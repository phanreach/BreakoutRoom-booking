import { Input } from "../../components/ui/input";
import Logo from "/src/assets/logo.png";
import useSignUp from "../../components/hook/use-signup";
import { useState } from "react";
import {
  registerSchema,
  type RegisterSchema,
} from "../../components/lib/schema/register-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";

export default function SignUp() {
  const signup = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await signup.mutateAsync(data);
    } catch {
      // errors handled in hook
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmje5E6ulFAAFFNuIs6LNFj6RQ0r7w54eqW0M6tO9Fr0p3tZDmsiL-gIjMh94VB0s1M3rOWT0oDSHhvaDHMrKQnLZVaA2gxCy6u4WuFZaq3ygiUTAvSGeOEu7mRNgHctgLeECKd9wpCeBXDVK0rVEREC75TTR1xkGR-5jz7Wute1JjudZpaMbMiJuEEPz2U-gMtK5SwhagvxA9dD9g5ffNtY7Jg8R2qTaSfOYbXzZEpx650FFIA4WiY_a6BvNJhUXvKCEB5eTk32xv"
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
              alt="Breakout Booking Logo"
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
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your username"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                CamTech Email
              </label>
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

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Phone
              </label>
              <Input
                type="text"
                placeholder="Enter your phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
              />
              <label className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                Remember this device
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || signup.isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-primary/25"
            >
              {isSubmitting || signup.isPending ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </a>
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
