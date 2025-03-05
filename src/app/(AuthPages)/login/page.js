import Link from "next/link";
import Image from "next/image";

import LoginForm from "@/widget/LoginForm";

const LogIn = () => {
    return (
        <div className=" h-screen flex justify-center items-center">
            <div className=" w-full flex justify-center items-center px-4">
                <div className="shadow-sign w-full rounded bg-white">
                    <div className="pt-4 lg:pt-8 pb-3 lg:pb-6 border-b border-divider flex items-center justify-center">
                        <Link
                            href={"/"}
                            className=" h-10 flex items-center justify-center"
                        >
                            <Image
                                height={40}
                                width={304}
                                alt="logo"
                                src={`/assets/logos/logo.png`}
                                className=" min-w-100 w-auto max-h-full h-10"
                            />
                        </Link>
                    </div>
                    <div className="pt-2 px-4 pb-2 xs:px-5 md:pt-3 md:px-7 md:pb-5 lg:pt-6 lg:px-[60px] lg:pb-10">
                        <h3 className="mb-3 lg:mb-6 text-warning_main font-semibold text-H3 ">
                            Login
                        </h3>
                        <LoginForm />
                        <div>
                            <p className="mb-3 lg:mb-6 text-center text-subtitle2">
                                Don’t have an account?
                                <Link href="#">
                                    <span className=" text-warning_main font-semibold capitalize">
                                        signup
                                    </span>
                                </Link>
                            </p>
                            <p className="text-center text-subtitle2">
                                <span className=" text-warning_main font-semibold capitalize">
                                    help line:
                                </span>
                                {"01754543235"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
