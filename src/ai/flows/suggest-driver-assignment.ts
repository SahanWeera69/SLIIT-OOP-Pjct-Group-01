'use server';
/**
 * @fileOverview A driver assignment suggestion AI agent.
 *
 * - suggestDriverAssignment - A function that suggests the optimal driver for a delivery.
 * - SuggestDriverAssignmentInput - The input type for the suggestDriverAssignment function.
 * - SuggestDriverAssignmentOutput - The return type for the suggestDriverAssignment function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getRoute, Location} from '@/services/maps';

const SuggestDriverAssignmentInputSchema = z.object({
  packageType: z.string().describe('The type of package to be delivered.'),
  driverAvailability: z
    .string()
    .describe('The availability of drivers, including their current location and schedule.'),
  pickupLocation: z.object({
    lat: z.number().describe('The latitude of the pickup location.'),
    lng: z.number().describe('The longitude of the pickup location.'),
  }).describe('The pickup location.'),
  deliveryLocation: z.object({
    lat: z.number().describe('The latitude of the delivery location.'),
    lng: z.number().describe('The longitude of the delivery location.'),
  }).describe('The delivery location.'),
});
export type SuggestDriverAssignmentInput = z.infer<
  typeof SuggestDriverAssignmentInputSchema
>;

const SuggestDriverAssignmentOutputSchema = z.object({
  driverId: z.string().describe('The ID of the suggested driver.'),
  reason: z.string().describe('The reasoning behind the driver assignment suggestion.'),
});
export type SuggestDriverAssignmentOutput = z.infer<
  typeof SuggestDriverAssignmentOutputSchema
>;

export async function suggestDriverAssignment(
  input: SuggestDriverAssignmentInput
): Promise<SuggestDriverAssignmentOutput | null> {
  return suggestDriverAssignmentFlow(input);
}

const routeTool = ai.defineTool({
  name: 'getRouteInfo',
  description: 'Retrieves the route information between two locations.',
  inputSchema: z.object({
    origin: z
      .object({
        lat: z.number().describe('The latitude of the origin location.'),
        lng: z.number().describe('The longitude of the origin location.'),
      })
      .describe('The origin location.'),
    destination: z
      .object({
        lat: z.number().describe('The latitude of the destination location.'),
        lng: z.number().describe('The longitude of the destination location.'),
      })
      .describe('The destination location.'),
  }),
  outputSchema: z.object({
    distanceMeters: z.number().describe('The distance of the route in meters.'),
    durationSeconds: z.number().describe('The duration of the route in seconds.'),
  }),
},
async input => {
  const route = await getRoute(
    input.origin as Location,
    input.destination as Location
  );
  return {
    distanceMeters: route.distanceMeters,
    durationSeconds: route.durationSeconds,
  };
});

const prompt = ai.definePrompt({
  name: 'suggestDriverAssignmentPrompt',
  tools: [routeTool],
  input: {
    schema: z.object({
      packageType: z.string().describe('The type of package to be delivered.'),
      driverAvailability: z
        .string()
        .describe('The availability of drivers, including their current location and schedule.'),
      pickupLocation: z
        .object({
          lat: z.number().describe('The latitude of the pickup location.'),
          lng: z.number().describe('The longitude of the pickup location.'),
        })
        .describe('The pickup location.'),
      deliveryLocation: z
        .object({
          lat: z.number().describe('The latitude of the delivery location.'),
          lng: z.number().describe('The longitude of the delivery location.'),
        })
        .describe('The delivery location.'),
    }),
  },
  output: {
    schema: z.object({
      driverId: z.string().describe('The ID of the suggested driver.'),
      reason: z.string().describe('The reasoning behind the driver assignment suggestion.'),
    }),
  },
  prompt: `Given the following package type: {{{packageType}}}, driver availability: {{{driverAvailability}}}, pickup location: {{{pickupLocation}}}, and delivery location: {{{deliveryLocation}}}, suggest the optimal driver assignment.

Consider the distance and duration of the route when making the suggestion. Use the getRouteInfo tool to determine the route information. Suggest only one driver.

Return the driver ID and the reason for the suggestion.`,
});

const suggestDriverAssignmentFlow = ai.defineFlow<
  typeof SuggestDriverAssignmentInputSchema,
  typeof SuggestDriverAssignmentOutputSchema
>(
  {
    name: 'suggestDriverAssignmentFlow',
    inputSchema: SuggestDriverAssignmentInputSchema,
    outputSchema: SuggestDriverAssignmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output ?? null;
  }
);
