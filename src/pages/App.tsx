import { useState } from 'react';
import './App.css';
import Builder from '../components/builder';
import fields from '../assets/json/fields.json';
import { Col, Row, Typography } from 'antd';

function App() {

    const [query, setQuery] = useState({
        and: [
            {
                field: 'email',
                operator: '=',
                value: 'admin@admin.com'
            }, {
                or: [
                    {
                        field: 'email',
                        operator: '=',
                        value: 'admin@admin.com'
                    }, {
                        field: 'gender',
                        operator: '=',
                        value: 'male'
                    }, {
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
                    }, {
                        field: 'gender',
                        operator: '=',
                        value: 'male'
                    }
                ]
            }, {
                or: [
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
            }
        ]
    });
    return (
        <div className="App">
            <Row>
                <Col span={6}>
                    <Typography.Title level={4}>Options</Typography.Title>
                </Col>
                <Col span={18}>
                    <Builder query={query} fields={fields} onChange={setQuery} options={{ showLabel: false }} styles={{ andColor: '#adece2', orColor: '#fff3d5', textColor: 'black' }} />
                </Col>
            </Row>

        </div>
    );
}

export default App;
