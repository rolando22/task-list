import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';
import { TasksProvider, UserProvider } from './context';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UserProvider>
			<TasksProvider>
				<App />
			</TasksProvider>
		</UserProvider>
	</React.StrictMode>,
);
