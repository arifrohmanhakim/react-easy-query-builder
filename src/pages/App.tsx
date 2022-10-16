import { useState } from 'react';
import './App.css';
import Builder from '../components/builder';
import fields from '../assets/json/fields.json';

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
            <Builder query={query} fields={fields} onChange={setQuery} options={{ showLabel: false }} styles={{ andColor: '#adece2', orColor: '#fff3d5', textColor: 'black' }} />
        </div>
    );
}

export default App;
