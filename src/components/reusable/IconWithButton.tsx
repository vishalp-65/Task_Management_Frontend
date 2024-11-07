import Image from "next/image";
import React from "react";

interface IconProps {
    src: string;
    alt: string;
    customClassName?: string;
    handleClick?: () => void;
    imageClassName?: string;
}

const IconWithButton: React.FC<IconProps> = ({
    src,
    alt,
    customClassName,
    handleClick,
    imageClassName,
}) => {
    return (
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${customClassName}`}
            onClick={handleClick}
        >
            <Image
                src={src}
                alt={alt}
                width={20}
                height={20}
                className={imageClassName}
            />
        </div>
    );
};

export default IconWithButton;
