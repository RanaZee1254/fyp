import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="https://i.ytimg.com/vi/VZgnPcMeLf4/hqdefault.jpg"
            alt="App Logo"
            className="h-10 w-10"
            {...props}
        />
    );
}
