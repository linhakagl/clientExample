import React, { useState, useRef } from 'react'
import { Tag, Tooltip, Input, Icon } from 'antd'

export default function TagCommentFilter(props) {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const tags = props.value || [];
  const saveInputRef = useRef(null);

  function handleClose(removedTag) {
    const newtags = tags.filter(tag => tag !== removedTag);
    if (props.onChange) {
      props.onChange(newtags);
    }
  };

  function showInput(e) {
    setInputVisible(true)
    setTimeout(() => {
      saveInputRef.current.focus();
    }, 200);
  };

  function handleInputChange(e) {
    setInputValue(e.target.value);
  };

  function handleInputConfirm() {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      if (props.onChange) {
        props.onChange([...tags, inputValue]);
      }
    }
    setInputValue('');
    setInputVisible(false);
  };

  return (
    <div>
      {tags.map((tag, index) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag key={tag} closable={true} onClose={() => handleClose(tag)}>
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
            tagElem
          );
      })}
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <Icon type="plus" /> New Tag
        </Tag>
      )}
    </div>
  );
}
