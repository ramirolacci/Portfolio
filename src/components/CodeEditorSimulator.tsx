import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const highlightSyntax = (code: string): string => {
    let html = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // 1. Comments (non-greedy, strictly ending at */)
    const comments: string[] = [];
    if (html.includes('*/')) {
        html = html.replace(/(\/\*\*[\s\S]*?\*\/|\/\*[\s\S]*?\*\/|\/\/.+$)/gm, (match) => {
            comments.push(`<span class="code-comment">${match}</span>`);
            return `___COMMENT_${comments.length - 1}___`;
        });
    } else if (html.startsWith('/*')) {
        // While typing inside comment block
        comments.push(`<span class="code-comment">${html}</span>`);
        html = `___COMMENT_0___`;
    }

    // 2. Strings
    const strings: string[] = [];
    html = html.replace(/("[^"]*"?|'[^']*'?)/g, (match) => {
        strings.push(`<span class="code-string">${match}</span>`);
        return `___STRING_${strings.length - 1}___`;
    });

    // 3. Keywords
    html = html.replace(/\b(const|let|var|function|return|import|export)\b/g, '<span class="code-keyword">$1</span>');

    // 4. Function / object variable names
    html = html.replace(/(<span class="code-keyword">const<\/span>\s+)([a-zA-Z0-9_$]+)/g, '$1<span class="code-function">$2</span>');

    // 5. Object Property Keys (title:, details:)
    html = html.replace(/\b(title|details)(:)/g, '<span class="code-property">$1</span>$2');

    // 6. Brackets & Punctuation
    html = html.replace(/([{}()[\];,])/g, '<span class="code-bracket">$1</span>');

    // Restore strings and comments
    html = html.replace(/___STRING_(\d+)___/g, (_, id) => strings[parseInt(id, 10)] || '');
    html = html.replace(/___COMMENT_(\d+)___/g, (_, id) => comments[parseInt(id, 10)] || '');

    return html;
};

const CodeEditorSimulator: React.FC = () => {
    const { t } = useTranslation();
    const [currentText, setCurrentText] = useState('');
    const stringIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);

    useEffect(() => {
        const buildString = (
            fnName: string,
            titleKey: string,
            descKey: string,
            details: string[]
        ) => {
            const title = t(titleKey);
            const desc = t(descKey);
            const detailLines = details
                .map((d, i) => `    "${t(d)}"${i < details.length - 1 ? ',' : ''}`)
                .join('\n');

            return (
                `/**\n` +
                ` * ${title}\n` +
                ` *\n` +
                ` * ${desc}\n` +
                ` */\n` +
                `const ${fnName} = {\n` +
                `  title: "${title}",\n` +
                `  details: [\n` +
                detailLines + '\n' +
                `  ]\n` +
                `};`
            );
        };

        const strings = [
            buildString(
                'webAppDevelopment',
                'ui_design_subheading',
                'ui_design_description',
                ['ui_detail_1', 'ui_detail_2', 'ui_detail_3']
            ),
            buildString(
                'uxUiDesign',
                'front_develop_subheading',
                'front_develop_description',
                ['ux_detail_1', 'ux_detail_2', 'ux_detail_3']
            ),
            buildString(
                'modeling3D',
                'back_develop_subheading',
                'back_develop_description',
                ['modeling_detail_1', 'modeling_detail_2', 'modeling_detail_3']
            ),
            buildString(
                'qaManualTesting',
                'testing_subheading',
                'testing_description',
                ['qa_detail_1', 'qa_detail_2', 'qa_detail_3']
            ),
        ];

        stringIndexRef.current = 0;
        charIndexRef.current = 0;
        isDeletingRef.current = false;

        let timer: ReturnType<typeof setTimeout>;

        const tick = () => {
            const currentFullString = strings[stringIndexRef.current % strings.length];

            if (isDeletingRef.current) {
                // Deleting phase
                charIndexRef.current = Math.max(0, charIndexRef.current - 5);
                setCurrentText(currentFullString.slice(0, charIndexRef.current));

                if (charIndexRef.current === 0) {
                    isDeletingRef.current = false;
                    stringIndexRef.current = (stringIndexRef.current + 1) % strings.length;
                    timer = setTimeout(tick, 350);
                } else {
                    timer = setTimeout(tick, 15);
                }
            } else {
                // Typing phase - exactly 1 character per tick
                charIndexRef.current = Math.min(currentFullString.length, charIndexRef.current + 1);
                setCurrentText(currentFullString.slice(0, charIndexRef.current));

                if (charIndexRef.current >= currentFullString.length) {
                    isDeletingRef.current = true;
                    timer = setTimeout(tick, 3500); // Pause on full text
                } else {
                    timer = setTimeout(tick, 18); // Speed per character
                }
            }
        };

        timer = setTimeout(tick, 300);

        return () => clearTimeout(timer);
    }, [t]);

    const highlightedHtml = highlightSyntax(currentText);

    return (
        <div className="code-editor-wrapper">
            <div className="code-editor">
                <div className="editor-titlebar">
                    <div className="titlebar-dots">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                    </div>
                    <div className="editor-tab">services.js</div>
                </div>
                <div className="editor-body">
                    <div className="line-numbers">
                        {Array.from({ length: 18 }, (_, i) => (
                            <span key={i}>{i + 1}</span>
                        ))}
                    </div>
                    <pre className="typed-output">
                        <span dangerouslySetInnerHTML={{ __html: highlightedHtml }}></span>
                        <span className="typed-cursor">█</span>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CodeEditorSimulator;
