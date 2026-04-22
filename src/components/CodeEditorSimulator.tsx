import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { useTranslation } from 'react-i18next';

const CodeEditorSimulator: React.FC = () => {
    const { t } = useTranslation();
    const outputRef = useRef<HTMLSpanElement>(null);
    const typedRef = useRef<Typed | null>(null);

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
                .map((d, i) => `    "<span class="code-string">${t(d)}</span>"${i < details.length - 1 ? ',' : ''}`)
                .join('\n');

            return (
                `<span class="code-comment">/**\n` +
                ` * ${title}\n` +
                ` *\n` +
                ` * ${desc}\n` +
                ` */</span>\n` +
                `<span class="code-keyword">const</span> <span class="code-function">${fnName}</span> = <span class="code-bracket">{</span>\n` +
                `  <span class="code-property">title</span>: "<span class="code-string">${title}</span>",\n` +
                `  <span class="code-property">details</span>: <span class="code-bracket">[</span>\n` +
                detailLines + '\n' +
                `  <span class="code-bracket">]</span>\n` +
                `<span class="code-bracket">}</span>;`
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

        if (outputRef.current) {
            typedRef.current = new Typed(outputRef.current, {
                strings,
                typeSpeed: 18,
                backSpeed: 4,
                backDelay: 3500,
                startDelay: 400,
                loop: true,
                showCursor: true,
                cursorChar: '█',
                contentType: 'html',
            });
        }

        return () => {
            typedRef.current?.destroy();
        };
    }, [t]);

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
                        <span ref={outputRef}></span>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CodeEditorSimulator;
