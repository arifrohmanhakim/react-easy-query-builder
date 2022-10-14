import { useState } from 'react';
import './App.css';
import Builder from '../components/builder';
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
            <Builder query={query} fields={[{
                key: 'email',
                label: 'Email',
                type: 'text'
            }, {
                key: 'gender',
                label: 'Gender',
                type: 'boolean',
                default: 'Male'
            }]} onChange={setQuery} options={{ showLabel: false }} />
        </div>
    );
}

export default App;
