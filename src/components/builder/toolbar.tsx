import { useCallback } from 'react';
import { Space, Button, Typography, Tooltip, Popover, Menu } from 'antd';
import { Plus, MoreHorizontal, Copy, Trash } from 'react-feather';
import _ from 'lodash';
import { currentQuery as recoilCurrentQuery } from '../../models/state';
import { useRecoilState } from 'recoil';

export default function ToolbarBuilder(props: any) {
    const { type, position } = props;
    const [currentQuery, setCurrentQuery] = useRecoilState(recoilCurrentQuery);

    /**
     * on Change current condition type
     */
    const onChangeCondition = useCallback(() => {
        if (_.isNil(currentQuery)) return;

        const currentValue = _.get(currentQuery, position);

        // split string position to array by .
        let splitPositon = _.split(position, '.');
        const lastIndex = _.size(splitPositon) - 1;

        // delete last index
        _.pullAt(splitPositon, lastIndex)
        let newQuery = _.cloneDeep(currentQuery);

        // set new value
        const newType = _.eq(type, 'and') ? 'or' : 'and';
        _.set(newQuery, _.join(splitPositon, '.'), { [newType]: currentValue })

        // update recoil
        setCurrentQuery(newQuery);
    }, [currentQuery, type, position, setCurrentQuery])

    const addContent = useCallback(() => {
        return (
            <Menu>
                <Menu.Item icon={<Plus size={18} />}>Condition</Menu.Item>
                <Menu.Item icon={<Plus size={18} />}>Group</Menu.Item>
            </Menu>
        )
    }, []);

    const moreContent = useCallback(() => {
        return (
            <Menu>
                <Menu.Item icon={<Copy size={18} />}>Duplicate</Menu.Item>
                <Menu.Item icon={<Trash size={18} />} danger>Delete</Menu.Item>
            </Menu>
        )
    }, []);

    return (
        <Space direction='vertical' className={`conditions-toolbar ${type}`}>
            <Popover trigger={['click']} placement="right" content={moreContent} overlayClassName="popover-menu">
                <Button icon={<MoreHorizontal />} type="text" size="small" />
            </Popover>
            <Tooltip title={`Click to Change Condition`} placement="right">
                <Typography.Title level={5} onClick={onChangeCondition}>{_.toUpper(type)}</Typography.Title>
            </Tooltip>
            <Popover trigger={['click']} placement="right" content={addContent} overlayClassName="popover-menu">
                <Button icon={<Plus />} type="text" size="small" shape="circle" />
            </Popover>
        </Space>
    )
}