import { useCallback, useMemo } from 'react';
import { Space, Button, Typography, Tooltip, Popover, Menu } from 'antd';
import { Plus, MoreHorizontal, Copy, Trash } from 'react-feather';
import _ from 'lodash';
import { currentQuery as recoilCurrentQuery } from '../../models/state';
import { useRecoilState } from 'recoil';
import { ConditionalItemProps } from '../../types/builderTypes';
import { removeEmptyArrayObject } from '../../utils/helpers';

export default function ToolbarBuilder(props: any) {
    const { type, position, isFirst = false, styles } = props;
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
    }, [currentQuery, type, position, setCurrentQuery]);

    /**
     * handle on add new condition
     */
    const onAddCondition = useCallback(() => {
        if (_.isNil(currentQuery)) return;
        let newQuery = _.cloneDeep(currentQuery);
        let currentValue: Array<ConditionalItemProps> = _.get(currentQuery, position);
        currentValue = [...currentValue, {
            field: 'gender',
            operator: '=',
            value: 'male'
        }]
        _.set(newQuery, position, currentValue)

        // update recoil
        setCurrentQuery(newQuery);
    }, [currentQuery, position, setCurrentQuery])

    /**
     * handle on add new condition
     */
    const onAddGroup = useCallback(() => {
        if (_.isNil(currentQuery)) return;
        let newQuery = _.cloneDeep(currentQuery);
        let currentValue: Array<ConditionalItemProps> = _.get(currentQuery, position);
        currentValue = [...currentValue, {
            and: [
                {
                    field: 'email',
                    operator: '=',
                    value: 'admin@admin.com'
                }, {
                    field: 'gender',
                    operator: '=',
                    value: 'male'
                }
            ]
        }]
        _.set(newQuery, position, currentValue)

        // update recoil
        setCurrentQuery(newQuery);
    }, [currentQuery, position, setCurrentQuery])

    /**
     * handle on add new condition
     */
    const onDuplicate = useCallback(() => {
        if (_.isNil(currentQuery)) return;
        let newQuery = _.cloneDeep(currentQuery);
        // split string position to array by .
        let splitPositon = _.split(position, '.');
        const lastType = _.last(splitPositon) || 'or';
        const lastIndex = _.size(splitPositon) - 1;

        // delete last index
        _.pullAt(splitPositon, lastIndex)
        const lastIndex2 = _.size(splitPositon) - 1;
        const splitLastPosition = _.split(splitPositon[lastIndex2], '[')
        _.pullAt(splitLastPosition, _.size(splitLastPosition) - 1);
        _.pullAt(splitPositon, lastIndex2)
        splitPositon.push(splitLastPosition[0]);


        const currentValue: Array<ConditionalItemProps> = _.get(currentQuery, position);
        let newValue: Array<ConditionalItemProps> = _.get(currentQuery, _.join(splitPositon, '.'));
        newValue = [...newValue, { [lastType]: currentValue }];
        _.set(newQuery, _.join(splitPositon, '.'), newValue)

        // update recoil
        setCurrentQuery(newQuery);

    }, [currentQuery, position, setCurrentQuery])

    /**
     * handle on add new condition
     */
    const onDeleteGroup = useCallback(() => {
        if (_.isNil(currentQuery)) return;
        let newQuery = _.cloneDeep(currentQuery);
        _.unset(newQuery, position)

        // update recoil
        setCurrentQuery(removeEmptyArrayObject(newQuery));
    }, [currentQuery, position, setCurrentQuery])

    /**
     * menu add
     */
    const addContent = useCallback(() => {
        return (
            <Menu>
                <Menu.Item icon={<Plus size={18} />} onClick={onAddCondition}>Condition</Menu.Item>
                <Menu.Item icon={<Plus size={18} />} onClick={onAddGroup}>Group</Menu.Item>
            </Menu>
        )
    }, [onAddCondition, onAddGroup]);

    /**
     * menu more
     */
    const moreContent = useCallback(() => {
        return (
            <Menu>
                {!isFirst &&
                    <Menu.Item icon={<Copy size={18} />} onClick={onDuplicate}>Duplicate</Menu.Item>}
                <Menu.Item icon={<Trash size={18} />} danger onClick={onDeleteGroup}>Delete</Menu.Item>
            </Menu>
        )
    }, [isFirst, onDuplicate, onDeleteGroup]);

    /**
     * toolbar styles
     */
    const toolbarStyles = useCallback((resultType: string) => {
        let result = {};
        if (_.isNil(styles)) return result;
        if (_.eq(resultType, 'background')) {
            if (_.eq(type, 'and') && !_.isNil(styles?.andColor)) return { backgroundColor: styles?.andColor };
            if (_.eq(type, 'or') && !_.isNil(styles?.orColor)) return { backgroundColor: styles?.orColor };
        }

        if (_.eq(resultType, 'text-color')) {
            if (!_.isNil(styles?.textColor)) return { color: styles?.textColor }
        }
        return result;
    }, [styles, type])

    return (
        <Space direction='vertical' className={`conditions-toolbar ${type}`} style={toolbarStyles('background')}>
            <Popover trigger={['click']} placement="right" content={moreContent} overlayClassName="popover-menu">
                <Button icon={<MoreHorizontal />} type="text" size="small" style={toolbarStyles('text-color')} />
            </Popover>
            <Tooltip title={`Click to Change Condition`} placement="right">
                <Typography.Title level={5} onClick={onChangeCondition} style={toolbarStyles('text-color')}>{_.toUpper(type)}</Typography.Title>
            </Tooltip>
            <Popover trigger={['click']} placement="right" content={addContent} overlayClassName="popover-menu">
                <Button icon={<Plus />} type="text" size="small" shape="circle" style={toolbarStyles('text-color')} />
            </Popover>
        </Space>
    )
}