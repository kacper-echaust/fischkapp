import { AppHeader } from './components/AppHeader'
import { AppLayout } from './components/AppLayout'

import './App.css'
import { AppMain } from './components/AppMain/AppMain'

function App() {
	return (
		<AppLayout>
			<AppHeader />
			<AppMain />
		</AppLayout>
	)
}

export default App
