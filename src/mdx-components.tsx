import type { MDXComponents } from "mdx/types";
import ItemsCard, {
  ItemsCardContent,
  ItemsCardLink,
  ItemsCardTech,
} from "@/components/ItemsCard";

const components: MDXComponents = {
  h1: (props) => <h1 className="text-3xl font-semibold mt-4 mb-2" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold mt-3 mb-1" {...props} />,
  p: (props) => <p className="my-2" {...props} />,
  a: (props) => <a className="underline" {...props} />,
  ul: (props) => <ul className="list-disc pl-5 my-2" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 my-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-2 border-ink pl-3 my-2 italic" {...props} />
  ),
  hr: (props) => <hr className="border-dashed border-ink my-4" {...props} />,
  code: (props) => <code className="bg-ink/10 px-1 text-sm" {...props} />,
  pre: (props) => (
    <pre
      className="bg-black text-white p-3 my-2 overflow-x-auto text-sm [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  ItemsCard,
  ItemsCardContent,
  ItemsCardLink,
  ItemsCardTech,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
