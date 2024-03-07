import React from 'react';

import ImageCarousel from '../components/ImageCarousel';
import FeaturesSection from '../components/FeaturesSection';

function Index() {
	return (
		<main>

			{/* Banner section start */}
			<ImageCarousel />
			{/* Banner section end */}

			<FeaturesSection />
		</main>
	);
}

export default Index;
