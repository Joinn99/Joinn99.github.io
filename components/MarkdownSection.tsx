import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Section from './Section';

interface MarkdownSectionProps {
  title: string;
  content?: string;
  id?: string;
}

const MarkdownSection: React.FC<MarkdownSectionProps> = ({ title, content, id }) => {
  const markdown = content?.trim() || '';

  return (
    <Section title={title} id={id}>
      {markdown && (
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-primary-600 dark:text-primary-400 font-medium hover:underline decoration-2 underline-offset-2"
                />
              ),
              p: ({ node, ...props }) => <p {...props} className="my-2" />,
              ul: ({ node, ...props }) => <ul {...props} className="my-2 space-y-1 pl-5" />,
              ol: ({ node, ...props }) => <ol {...props} className="my-2 space-y-1 pl-5" />,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      )}
    </Section>
  );
};

export default MarkdownSection;
