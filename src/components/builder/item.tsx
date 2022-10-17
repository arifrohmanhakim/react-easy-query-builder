import { Input, Select, Button, Tooltip } from 'antd';
import _ from 'lodash';
import { useCallback } from 'react';
import { Copy, Trash, Menu } from 'react-feather';
import { currentQuery as recoilCurrentQuery } from '../../models/state';
import { useRecoilState } from 'recoil';
import { ConditionalItemProps } from '../../types/builderTypes';
import { removeEmptyArrayObject } from '../../utils/helpers';

const { Option } = Select;
export default function ItemBuilder(props: any) {
    const { index, item, fields, options, position, styles = {} } = props;
    const [currentQuery, setCurrentQuery] = useRecoilState(recoilCurrentQuery);

    /**
     * on duplicate item
     */
    const onDuplicateItem = useCallback(() => {
        try {
            if (_.isNil(currentQuery)) return;
            let newQuery = _.cloneDeep(currentQuery);
            let newValue: Array<ConditionalItemProps> = _.get(currentQuery, position);
            newValue = [...newValue];
            newValue.splice(index, 0, item)
            _.set(newQuery, position, newValue)
            setCurrentQuery(newQuery);
        } catch (error) {
            console.log("Err:onDuplicateItem", error);
        }
    }, [currentQuery, position, index, item, setCurrentQuery])

    /**
     * on delete item
     */
    const onDeleteItem = useCallback(() => {
        try {
            if (_.isNil(currentQuery)) return;
            let newQuery = _.cloneDeep(currentQuery);
            let newValue: Array<ConditionalItemProps> = _.get(currentQuery, position);
            newValue = [...newValue];
            _.pullAt(newValue, index)
            _.set(newQuery, position, newValue)
            const currentValue = _.get(newQuery, position);
            if (_.isEmpty(currentValue)) {
                let splitPosition = _.split(position, '.');
                const newPosition = _.dropRight(splitPosition, 1);
                _.unset(newQuery, newPosition)
                setCurrentQuery(removeEmptyArrayObject(newQuery));
                return;
            }
            setCurrentQuery(newQuery);
        } catch (error) {
            console.log("Err:onDeleteItem", error);
        }
    }, [currentQuery, position, index, setCurrentQuery])

    return (
        <div className="conditions-item" style={styles}>
            <div className="container">
                <div className='field actions'>
                    <Button type='text' icon={<Menu size={18} color="#ccc" />} className="btn-drag" />
                </div>
                <div className='field'>
                    {options?.showLabel && <label>Field</label>}
                    <Select value={item?.field} bordered={false}>
                        {_.map(fields, field => (
                            <Option key={field?.key} value={field?.key}>{field?.label}</Option>
                        ))}
                    </Select>
                </div>
                <div className='field'>
                    {options?.showLabel && <label>Operator</label>}
                    <Select value={item?.operator} bordered={false}>
                        <Option value="=">==</Option>
                        <Option value="!=">!=</Option>
                    </Select>
                </div>
                <div className='field'>
                    {options?.showLabel && <label>Value</label>}
                    <Input bordered={false} placeholder="Value" />
                </div>
                <div className='field actions hide'>
                    <Tooltip title="Duplicate">
                        <Button type='text' icon={<Copy size={20} />} onClick={onDuplicateItem} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button type='text' icon={<Trash size={20} />} onClick={onDeleteItem} />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}