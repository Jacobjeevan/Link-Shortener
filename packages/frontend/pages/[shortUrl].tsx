import { getLongUrl } from "../components/links/LinksApi";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";

interface shortUrlProps {
  success: boolean;
}

const shortUrl = ({ success }: shortUrlProps): null => {
  if (!success) {
    toast.error("Url not found");
  }
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { shortUrl } = context.params;

  const APIresponse = await getLongUrl(shortUrl);
  const { success, url } = APIresponse;
  if (success) {
    return {
      redirect: {
        destination: url,
        permanent: true,
      },
    };
  }
  return {
    props: {
      success: false,
    },
  };
};

export default shortUrl;
