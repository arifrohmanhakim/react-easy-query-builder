import { Space, Button, Typography, Tooltip } from 'antd';
import { Plus, MoreHorizontal } from 'react-feather';
import _ from 'lodash';

export default function ToolbarBuilder(props: any) {
    const { type } = props;
    return (
        <Space direction='vertical' className={`conditions-toolbar ${type}`}>
            <Button icon={<MoreHorizontal />} type="text" size="small" />
            <Typography.Title level={5}>{_.toUpper(type)}</Typography.Title>
            <Tooltip title={`Add ${_.toUpper(type)} Condition`} placement="right">
                <Button icon={<Plus />} type="text" size="small" shape="circle" />
            </Tooltip>
        </Space>
    )
}