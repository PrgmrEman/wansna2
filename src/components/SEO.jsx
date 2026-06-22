import { useEffect } from "react";

export default function SEO({
  title,
  description,
  canonical,
}) {
  useEffect(() => {
    document.title = `${title} | ونسنّا`;

    let metaDesc = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }

    metaDesc.setAttribute("content", description);

    if (canonical) {
      let canonicalLink = document.querySelector(
        'link[rel="canonical"]'
      );

      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }

      canonicalLink.setAttribute("href", canonical);
    }
  }, [title, description, canonical]);

  return null;
}