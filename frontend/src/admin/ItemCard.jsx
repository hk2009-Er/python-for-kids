import React, { Component } from "react";


/* Collapsible card with move / duplicate / delete controls. */
class ItemCard extends Component {

    render() {

        const {
            index, count, label, summary, badge, expanded,
            onToggle, onMove, onDuplicate, onDelete, children
        } = this.props;

        return (
            <div className={expanded ? "adm-item open" : "adm-item"}>

                <div className="adm-item-head">

                    <button
                        type="button"
                        className="adm-item-toggle"
                        onClick={onToggle}
                        aria-expanded={expanded}
                    >
                        <span className="adm-item-caret" aria-hidden="true">
                            {expanded ? "▾" : "▸"}
                        </span>
                        <span className="adm-item-num">{label} {index + 1}</span>
                        <span className="adm-item-summary">
                            {summary || <em>Untitled</em>}
                        </span>
                        {badge && <span className="adm-item-badge">{badge}</span>}
                    </button>

                    <div className="adm-item-tools">
                        <button
                            type="button"
                            className="adm-icon-btn"
                            onClick={() => onMove(-1)}
                            disabled={index === 0}
                            title="Move up"
                            aria-label={`Move ${label} ${index + 1} up`}
                        >↑</button>
                        <button
                            type="button"
                            className="adm-icon-btn"
                            onClick={() => onMove(1)}
                            disabled={index === count - 1}
                            title="Move down"
                            aria-label={`Move ${label} ${index + 1} down`}
                        >↓</button>
                        <button
                            type="button"
                            className="adm-icon-btn"
                            onClick={onDuplicate}
                            title="Duplicate"
                            aria-label={`Duplicate ${label} ${index + 1}`}
                        >⧉</button>
                        <button
                            type="button"
                            className="adm-icon-btn danger"
                            onClick={onDelete}
                            title="Delete"
                            aria-label={`Delete ${label} ${index + 1}`}
                        >🗑</button>
                    </div>

                </div>

                {expanded && (
                    <div className="adm-item-body">
                        {children}
                    </div>
                )}

            </div>
        );
    }
}

export default ItemCard;
