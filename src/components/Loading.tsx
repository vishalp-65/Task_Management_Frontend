import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <Image
                src="/svg/logo.svg"
                alt="Logo"
                width={30}
                height={30}
                className="animate-pulse duration-700 w-16 h-16"
            />
        </div>
    );
};
