import React from 'react';

import ImageCarousel from '../components/ImageCarousel';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import CTABanner from '../components/CATBanner';

function Index() {
	return (
		<main>
			<ImageCarousel />
			<FeaturesSection />
			<CTABanner
				title="Take Control of Your Savings Today"
				text="Start saving more on your purchases with Price Mate. Our powerful tool ensures you get the best deals available, every time."
				img="assets/images/cta-banner2.jpg"
				isReverse={true}
			/>
			<HowItWorks />
			<CTABanner
				title="Ready to Start Saving?"
				text="Take the first step towards unlocking unbeatable deals and maximizing your savings potential."
				img="assets/images/cta-banner1.jpg"
			/>
		</main>
	);
}

export default Index;
