import { Image } from "react-native";

type Props = {
  source: string;
} & React.ComponentProps<typeof Image>;

export default function ImageComponent({ source, ...props }: Props) {
  return (
    <Image
      {...props}
      source={source || require("@/assets/images/logo-png.png")}
    />
  );
}
