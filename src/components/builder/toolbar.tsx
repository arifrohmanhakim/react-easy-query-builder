import { useCallback } from 'react';
import { Space, Button, Typography, Tooltip, Popover, Menu } from 'antd';
import { Plus, MoreHorizontal } from 'react-feather';
import _ from 'lodash';

export default function ToolbarBuilder(props: any) {
    const { type } = props;

    const addContent = useCallback(() => {
        return (
            <Menu>
                <Menu.Item icon={<Plus size={18} />}>Condition</Menu.Item>
                <Menu.Item icon={<Plus size={18} />}>Group</Menu.Item>
            </Menu>
        )
    }, []);

    return (
        <Space direction='vertical' className={`conditions-toolbar ${type}`}>
            <Button icon={<MoreHorizontal />} type="text" size="small" />
            <Tooltip title={`Change Condition`} placement="right">
                <Typography.Title level={5}>{_.toUpper(type)}</Typography.Title>
            </Tooltip>
            <Popover trigger={['click']} placement="right" content={addContent} overlayClassName="popover-menu">
                <Button icon={<Plus />} type="text" size="small" shape="circle" />
            </Popover>
        </Space>
    )
}