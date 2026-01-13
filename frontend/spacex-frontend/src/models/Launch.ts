export interface Launch {
  launch_id: string;
  mission_name: string;
  mission_purpose: string;
  rocket_name: string;
  launch_date: string;
  status: "SUCCESS" | "FAILED" | "SCHEDULED";
  launchpad: string;
  payloads: string[];
  last_updated?: string;
}
