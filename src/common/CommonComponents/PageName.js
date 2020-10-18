import React from 'react'
import { Breadcrumb } from 'antd';

function PageName(props) {
    return (
        <div className="page-header">
            <div className="page-header-split page-header-name">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <h2 style={{ color: '#585858' }}>{props.text}</h2>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {props.breadItem ? (
                    <Breadcrumb>
                        {props.breadItem.map((item, index) => (
                            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                ) : (
                        <></>
                    )}
            </div>

            <div className="page-header-split page-header-children">
                <div className={props.childrenName === "actionButtons" ? "page-header-action-buttons" : ""}>
                    {(props.children && props.children.length) > 1 ? props.children.map(child => {
                        return child
                    }) : props.children ? (
                        props.children
                    ) : (
                                <></>
                            )}
                </div>
            </div>

            {props.content ? props.content : null}
        </div>
    )
}

export default React.memo(PageName) 
