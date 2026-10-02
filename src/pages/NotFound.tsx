import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="page-wrap flex min-h-[60vh] flex-col items-start justify-center py-20">
      <Seo
        title="Page Not Found | Aangan Exhibition"
        description="The page you're looking for doesn't exist or has been moved."
        path={location.pathname}
        noindex
      />
      <p className="font-display text-7xl text-madder md:text-9xl">404</p>
      <h1 className="mt-2 text-3xl md:text-4xl">We can't find that page</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        The link may be old, or the page has moved. Head back home to find the next exhibition.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
