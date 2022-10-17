import { useCallback, useEffect } from 'react';
import { Layout, Typography, Row, Col, Space, Button } from 'antd';
import { BuilderProps, ConditionalItemProps } from '../../types/builderTypes';
import { Plus } from 'react-feather';
import _ from 'lodash';
import '../../assets/scss/main.scss';
import ItemBuilder from './item';
import ToolbarBuilder from './toolbar';
import { currentQuery as recoilCurrentQuery } from '../../models/state';
import { useRecoilState } from 'recoil';

const { Content } = Layout;
export default function Builder(props: BuilderProps) {
    const { query, fields, options, styles } = props;
    const [currentQuery, setCurrentQuery] = useRecoilState(recoilCurrentQuery);

    useEffect(() => {
        setCurrentQuery(query)
    }, [])

    /**
     * display conditional items
     */
    const conditional = useCallback((items: any, first = false, position: string = '') => {
        return (
            <>
                {_.map(items, (val, key) => {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    position += first ? '' : '.'
                    position += `${key}`
                    return (
                        <div key={position} className="conditions-group" style={{ marginTop: first ? 0 : 14 }
                        }>
                            <Row align='stretch' justify='space-between' className={`parent-conditions ${first ? 'first' : ''}`}>
                                <Col>
                                    <ToolbarBuilder type={key} position={position} isFirst={first} styles={styles} />
                                </Col>
                                <Col className={`wrap-item`}>
                                    {_.map(val, (item: ConditionalItemProps, index: any) => !_.isNil(item?.or) || !_.isNil(item?.and) ? conditional(item, false, `${position}[${index}]`) : (
                                        <ItemBuilder key={`${position}[${index}]`} item={item} index={index} position={position} fields={fields} options={options} styles={{ marginTop: !_.isNil(val[index - 1]?.or) || !_.isNil(val[index - 1]?.and) ? 14 : 0 }} />
                                    ))}
                                </Col>
                            </Row>
                        </div>
                    )
                })
                }
            </>
        )
    }, [fields, options, styles])

    return (
        <Layout>
            <Content style={{ padding: 24 }}>
                <Row gutter={12} align="middle" justify='space-between' style={{ marginBottom: 15 }}>
                    <Col>
                        <Typography.Title level={5}>CONDITIONS</Typography.Title>
                    </Col>
                    <Col>
                        <Space>
                            <Button className='btn-icon-center' icon={<Plus />}>Condition</Button>
                            <Button className='btn-icon-center' icon={<Plus />}>Group</Button>
                        </Space>
                    </Col>
                </Row>
                {_.isNil(currentQuery) ? null :
                    <Content>
                        <Space direction='vertical' size="large" style={{ width: '100%' }}>
                            {conditional(currentQuery, true)}
                        </Space>
                    </Content>
                }
            </Content>
        </Layout>
    )
}