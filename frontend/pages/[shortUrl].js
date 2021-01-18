import { getLongUrl } from "../components/links/LinksApi";
import { toast } from "react-toastify";

const shortUrl = ({ success }) => {
  if (!success) {
    toast.error("Url not found");
  }
  return null;
};

export async function getServerSideProps(context) {
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
}

export default shortUrl;
