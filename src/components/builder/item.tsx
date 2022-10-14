import { Input, Select, Button, Tooltip } from 'antd';
import _ from 'lodash';
import { Copy, Trash, Menu } from 'react-feather';

const { Option } = Select;
export default function ItemBuilder(props: any) {
    const { item, fields, options } = props;

    return (
        <div className="conditions-item">
            <div className="container">
                <div className='field actions'>
                    <Button type='text' icon={<Menu size={18} color="#ccc" />} />
                </div>
                <div className='field'>
                    {options?.showLabel && <label>Field</label>}
                    <Select value={item?.field}>
                        {_.map(fields, field => (
                            <Option value={field?.key}>{field?.label}</Option>
                        ))}
                    </Select>
                </div>
                <div className='field'>
                    {options?.showLabel && <label>Operator</label>}
                    <Select value={item?.operator}>
                        <Option value="=">==</Option>
                        <Option value="!=">!=</Option>
                    </Select>
                </div>
                <div className='field'>
                    {options?.showLabel && <label>Value</label>}
                    <Input />
                </div>
                <div className='field actions'>
                    <Tooltip title="Duplicate">
                        <Button type='text' icon={<Copy size={20} />} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button type='text' icon={<Trash size={20} />} />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}