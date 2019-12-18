import React, { useState } from 'react'
import {Drawer, Icon, Tooltip, notification } from 'antd';
import MonacoEditor from 'react-monaco-editor'
import moment from 'moment';
import { ISchemaCodeProps } from '../utils/types'

// const options = {
//   selectOnLineNumbers: true
// };

const styles = {
  icon: {
    fontSize: '24px',
    color: '#fff',
    marginBottom: '15px'
  }
};

export const SchemaCode: React.FC<ISchemaCodeProps> = ({
  schema,
  onChange
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  if (typeof schema === 'object') {
    schema = JSON.stringify(schema, null, '\t')
  }

  const copySchema = () => {
    const oEle = document.createElement('textarea');
    oEle.value = schema;
    document.body.appendChild(oEle);
    oEle.select();
    document.execCommand('Copy'); 
    oEle.style.display = 'none';
    notification
    notification.open({
      message: 'shcema复制成功',
      duration: 2,
    });
  }

  const downloadSchema = () => {
    const aEle = document.createElement('a');
    aEle.download = `${moment().format('YYYYMMDD-HHmmss')}schema.json`;
    aEle.style.display = 'none';
    var blob = new Blob([schema], {type:'application/json,charset=utf-8;'});
    aEle.href = URL.createObjectURL(blob);
    document.body.appendChild(aEle);
    aEle.click();
    document.body.removeChild(aEle);
  }

  const aside = (
    <div style={{ width: '28px', padding: '5px 0', textAlign: 'center', background: '#1890ff' }}>
      <Tooltip placement="left" title="预览、编辑协议">
        <Icon type="codepen" onClick={() => { setShowDrawer(true) }} style={styles.icon} />
      </Tooltip>
      <Tooltip placement="left" title="复制协议">
        <Icon type="copy" onClick={copySchema} style={styles.icon} />
      </Tooltip>
      <Tooltip placement="left" title="下载协议">
        <Icon type="download" onClick={downloadSchema} style={styles.icon} />
      </Tooltip>
    </div>
  );

  return (
    <div style={{ height: '100%', }}>
      {
        !showDrawer ? aside : null
      }

      <Drawer
        width="840"
        placement="right"
        visible={showDrawer}
        closable={false}
        bodyStyle={{ padding: 0, height: '100%' }}
        onClose={() => setShowDrawer(false)} >
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
          <MonacoEditor
            language="json"
            theme="vs-dark"
            onChange={(schema) => onChange(JSON.parse(schema))}
            value={schema}
          />
          {
            showDrawer ? aside : null
          }
        </div>
      </Drawer>
    </div>
  )
}
