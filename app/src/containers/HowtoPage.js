import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown/with-html';

const readmeFile = require('./assets/howto.md');

function HowtoPage() {
  const [text, setText] = useState('');
  useEffect(() => {
    fetch(readmeFile)
      .then(respones => respones.text())
      .then(text => {
        setText(text);
      });
  }, []);
  return (
    <div style={{ padding: '16px', backgroundColor: 'white' }}>
      <ReactMarkdown source={text} escapeHtml={false} />
    </div>
  );
}

export default HowtoPage;
