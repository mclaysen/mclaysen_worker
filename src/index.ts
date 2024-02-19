/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	authorizedHosts: ["workers-playground-empty-pine-6d03.mclaysen.workers.dev"],

	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let origin = request.headers.get("origin");
		const { method, url } = request;
		const { host, pathname } = new URL(url);
		if(request?.cf===undefined){
			return new Response("Unknown location");
		}
		const locationInfo = {
		  country: request.cf.country,
		  city: request.cf.city,
		  state: request.cf.region,
		  zip: request.cf.postalCode,
		  latitude: request.cf.latitude,
		  longitude: request.cf.longitude
		};
		console.log(this.authorizedHosts);
		if (!this.authorizedHosts.includes(host)) {
		  return new Response("Unauthorized for " + host, {
			status: 403
		  });
		}
		return new Response(JSON.stringify(locationInfo), {
		  status: 200
		});
	  }
	};
