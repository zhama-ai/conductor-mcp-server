/**
 * @fileoverview Basic MCP Server Example
 *
 * This example shows how to create a simple MCP server using the @conductor/mcp-server package.
 * It includes a basic calculator tool and demonstrates the minimal setup required.
 */

import { createMCPServer} from '@zhama/mcp-server';
import config from './config';
import { MedicalRecordTool, PatientInfoTool } from './tools';


async function main() {
  console.log('🚀 Starting TCare MCP Server...');

  try {
    // Create the server
    const server = createMCPServer('tcare-mcp-server', '1.0.0')
      .description('A MCP server for TCare')
      .author('TCare')
      .license('MIT')
      .enableTools({ listChanged: true })
      .addTool(new PatientInfoTool())
      .addTool(new MedicalRecordTool());

    console.log('📋 Server configured with saveMedicalRecord and getPatientInfo tools');

    // Run the server
    const args = process.argv.slice(2);

    if (args.includes('--stdio')) {
      console.log('🔗 Starting in STDIO mode');
      await server.runStdio();
    } else {
      const port = config.port;
      console.log(`🌐 Starting in SSE mode on port ${port}`);
      await server.runSSE(port);
    }

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
