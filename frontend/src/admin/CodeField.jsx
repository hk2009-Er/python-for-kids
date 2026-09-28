import React, { Component } from "react";

const INDENT = "    ";


/* Insert text at the cursor, keeping Ctrl+Z working where possible. */
function insertText(textarea, text) {

    let ok = false;

    try {
        ok = text === ""
            ? document.execCommand("delete", false)
            : document.execCommand("insertText", false, text);
    } catch {
        ok = false;
    }

    if (!ok) {
        textarea.setRangeText(text, textarea.selectionStart, textarea.selectionEnd, "end");
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }
}


/* Monospace code textarea: Tab = 4 spaces, Shift+Tab un-indents. */
class CodeField extends Component {

    handleKeyDown = (event) => {

        if (event.key !== "Tab") {
            return;
        }

        event.preventDefault();

        const textarea = event.target;
        const { selectionStart, selectionEnd, value } = textarea;
        const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;

        if (event.shiftKey) {
            const leading = value.slice(lineStart).match(/^ {1,4}/);

            if (leading) {
                textarea.setSelectionRange(lineStart, lineStart + leading[0].length);
                insertText(textarea, "");
            }
            return;
        }

        if (selectionStart !== selectionEnd &&
            value.slice(selectionStart, selectionEnd).includes("\n")) {

            const block = value.slice(lineStart, selectionEnd);
            textarea.setSelectionRange(lineStart, selectionEnd);
            insertText(textarea, block.split("\n").map(line => INDENT + line).join("\n"));
            return;
        }

        insertText(textarea, INDENT);
    };


    render() {

        const { id, name, value, onChange, rows = 6, placeholder, readOnly } = this.props;
        const lines = String(value || "").split("\n").length;

        return (
            <textarea
                id={id}
                name={name}
                className="adm-code"
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={readOnly ? undefined : this.handleKeyDown}
                rows={Math.max(rows, Math.min(lines + 1, 20))}
                placeholder={placeholder}
                readOnly={readOnly}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                wrap="off"
            />
        );
    }
}

export default CodeField;
