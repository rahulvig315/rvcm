import Logo from '../components/(shared)/Logo';
import {Login} from '../components/(auth)/Login';

const homeClasses = 'side-by-side';

export default function Home() {
	return (
		<main className={homeClasses}>
			<Logo />
			<Login />
		</main>
	);
}
