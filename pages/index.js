import React from 'react';

import {Button, DatePicker} from 'antd';
import styled from 'styled-components';

export default function Home() {
  return (
    <div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
      <DatePicker />
    </div>
  );
}
