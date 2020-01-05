import { useState } from "react";
import { Button } from "antd";

import Colors from "@src/components/atoms/colors";

export default function TableReloadButton() {
  const [isLoading, setLoading] = useState(false);

  return (
    <Button
      icon="reload"
      style={{ color: Colors.Primary, borderColor: Colors.Primary }}
      loading={isLoading}
    >
      새로 고침
    </Button>
  );
}
