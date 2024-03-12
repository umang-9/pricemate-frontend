import React from 'react';

import ImageCarousel from '../components/ImageCarousel';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';

function Index() {
	return (
		<main>

			{/* Banner section start */}
			<ImageCarousel />
			{/* Banner section end */}

			<FeaturesSection />
			<HowItWorks />
		</main>
	);
}

export default Index;
