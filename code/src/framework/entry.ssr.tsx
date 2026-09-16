import { createFromReadableStream } from "@vitejs/plugin-rsc/ssr";
import { renderToReadableStream as renderHTMLToReadableStream } from "react-dom/server.edge";
import {
	unstable_RSCStaticRouter as RSCStaticRouter,
	unstable_routeRSCServerRequest as routeRSCServerRequest,
} from "react-router";

export async function generateHTML(
	request: Request,
	fetchServer: (request: Request) => Promise<Response>,
): Promise<Response> {
	return await routeRSCServerRequest({
		// The incoming request.
		request,
		// How to call the React Server.
		fetchServer,
		// Provide the React Server touchpoints.
		createFromReadableStream,
		// Render the router to HTML.
		async renderHTML(getPayload) {
			const payload = getPayload();

			const bootstrapScriptContent =
				await import.meta.viteRsc.loadBootstrapScriptContent("index");

			return await renderHTMLToReadableStream(
				<RSCStaticRouter getPayload={getPayload} />,
				{
					bootstrapScriptContent,
					formState: payload.formState,
				},
			);
		},
	});
}
