import Layout from "components/common/Layout";
import { getModule } from "components/agility-pageModules";
import SiteHeader from "components/common/SiteHeader";


export async function getServerSideProps({ params, req, res, query, preview, resolvedUrl, locale, locales, defaultLocale }) {

	try {
console.log("TEST", params, resolvedUrl)
		if (!preview) {
			res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59')
		}

		//import { getAgilityPageProps  } from "@agility/nextjs/node";
		let { getAgilityPageProps } = require("@agility/nextjs/node")


		//place all global here
		const globalComponents = {
			header: SiteHeader,
		};

		const agilityProps = await getAgilityPageProps({
			preview,
			params,
			locale,
			getModule,
			defaultLocale,
			globalComponents,
		});

		if (!agilityProps) {
			// We throw to make sure this fails at build time as this is never expected to happen
			throw new Error(`Page not found`);
		}


		return {
			// return all props
			props: agilityProps
		};
	} catch (error) {
		return {
			props: {
				error: `An error occurred: ${error}`
			}
		}
	}
}

// // Next.js will statically pre-render all the paths from Agility CMS
// export async function getStaticPaths({ locales, defaultLocale }) {
// 	//get the paths configured in agility
// 	let agilityPaths = await getAgilityPaths({
// 		preview: false,
// 		locales,
// 		defaultLocale,
// 	});

// 	return {
// 		paths: agilityPaths,
// 		fallback: true,
// 	};
// }

const AgilityPage = (props) => {
	return JSON.stringify(props, )
	//return <Layout {...props} />;
};

export default AgilityPage;
