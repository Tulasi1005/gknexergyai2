import { useEffect } from "react";

const BASE_URL = "https://gknexergy.com";
const DEFAULT_IMAGE = "https://gknexergy.com/images/center.png";
const SITE_NAME = "GK Nexergy";

const SEO = ({
    title,
    description,
    keywords = "",
    canonical = "",
    ogType = "website",
    ogImage = DEFAULT_IMAGE,
    noindex = false,
    schema = null,
}) => {
    useEffect(() => {
        // 1. Format page title
        const fullTitle = title
            ? title.includes("GK Nexergy")
                ? title
                : `${title} | GK Nexergy`
            : "GK Nexergy | AI Solutions, Automation & Digital Transformation";

        document.title = fullTitle;

        // 2. Helper to set or update <meta> tags
        const setMeta = (attr, key, content) => {
            if (!content) return;
            let el = document.head.querySelector(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        // 3. Helper to set or update <link> tags
        const setLink = (rel, href) => {
            if (!href) return;
            let el = document.head.querySelector(`link[rel="${rel}"]`);
            if (!el) {
                el = document.createElement("link");
                el.setAttribute("rel", rel);
                document.head.appendChild(el);
            }
            el.setAttribute("href", href);
        };

        // Standard Meta
        setMeta("name", "description", description);
        if (keywords) {
            setMeta("name", "keywords", keywords);
        }
        setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
        setMeta("name", "author", "GK Nexergy");
        setMeta("name", "publisher", "GK Nexergy");

        // Canonical URL
        const currentPath = window.location.pathname;
        const canonicalUrl = canonical || `${BASE_URL}${currentPath === "/" ? "" : currentPath}`;
        setLink("canonical", canonicalUrl);

        // Open Graph
        setMeta("property", "og:site_name", SITE_NAME);
        setMeta("property", "og:title", fullTitle);
        setMeta("property", "og:description", description);
        setMeta("property", "og:type", ogType);
        setMeta("property", "og:url", canonicalUrl);
        setMeta("property", "og:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);
        setMeta("property", "og:locale", "en_US");

        // Twitter Cards
        setMeta("name", "twitter:card", "summary_large_image");
        setMeta("name", "twitter:site", "@gknexergy");
        setMeta("name", "twitter:title", fullTitle);
        setMeta("name", "twitter:description", description);
        setMeta("name", "twitter:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);

        // 4. Structured Data (JSON-LD)
        const schemaId = "seo-jsonld-schema";
        let scriptTag = document.head.querySelector(`script#${schemaId}`);

        if (schema) {
            if (!scriptTag) {
                scriptTag = document.createElement("script");
                scriptTag.id = schemaId;
                scriptTag.type = "application/ld+json";
                document.head.appendChild(scriptTag);
            }
            scriptTag.textContent = JSON.stringify(schema);
        } else if (scriptTag) {
            scriptTag.remove();
        }

        return () => {
            // Clean up schema on unmount if needed
        };
    }, [title, description, keywords, canonical, ogType, ogImage, noindex, schema]);

    return null;
};

export default SEO;
