# @zhama/mcp-server Examples

This directory contains examples demonstrating how to use the `@zhama/mcp-server` npm package to build your own MCP (Model Context Protocol) servers.

## Quick Start

### Installation

First, install the package:

```bash
npm install @zhama/mcp-server
```

### Basic Example

Run the basic server example:

```bash
# Development mode (TypeScript)
npm run example:basic

# With specific arguments
npx ts-node examples/basic-server.ts --stdio
npx ts-node examples/basic-server.ts --port=3001
```

### Advanced Example

Run the advanced server example:

```bash
# Development mode (TypeScript)
npm run example:advanced

# With specific arguments
npx ts-node examples/advanced-server.ts --stdio
npx ts-node examples/advanced-server.ts --port=3002
```

## Examples Overview

### Basic Server (`basic-server.ts`)

Demonstrates:
- Simple tool creation using decorators
- Basic server setup
- STDIO and SSE modes

Features:
- Calculator tool with basic math operations

### Advanced Server (`advanced-server.ts`)

Demonstrates:
- Multiple custom tools
- Resource management
- Prompt generation
- Complex tool implementations

Features:
- HTTP request tool
- Text processing tool
- Configuration resource
- Code review prompt

## Creating Your Own Server

### 1. Basic Setup

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

// Create your custom tool
@Tool({
  name: 'my-tool',
  description: 'Description of my tool',
  parameters: [
    {
      name: 'param1',
      type: 'string',
      description: 'Parameter description',
      required: true
    }
  ]
})
class MyTool extends BaseTool {
  protected toolDefinition = {
    name: 'my-tool',
    description: 'Description of my tool',
    parameters: []
  };

  protected async executeInternal(parameters: Record<string, unknown>): Promise<unknown> {
    // Your tool logic here
    return { result: 'success' };
  }
}

// Create and run the server
const server = createMCPServer('my-server', '1.0.0')
  .description('My custom MCP server')
  .enableTools()
  .addTool(new MyTool());

await server.runStdio();
```

### 2. Adding Resources

```typescript
import { BaseResource, Resource } from '@zhama/mcp-server';

class MyResource extends BaseResource {
  protected resourceDefinition = {
    type: 'application/json' as const,
    description: 'My custom resource'
  };

  protected async executeInternal(content: string): Promise<Resource> {
    return {
      id: 'my-resource',
      uri: 'resource://my-resource',
      name: 'My Resource',
      description: 'Custom resource description',
      type: 'application/json',
      content: JSON.stringify({ data: 'example' })
    };
  }
}

// Add to server
server.enableResources().addResource(new MyResource());
```

### 3. Adding Prompts

```typescript
import { BasePrompt, Prompt } from '@zhama/mcp-server';

class MyPrompt extends BasePrompt {
  protected promptDefinition = {
    type: 'text' as const,
    description: 'My custom prompt'
  };

  protected async executeInternal(content: string): Promise<Prompt> {
    return {
      id: 'my-prompt',
      name: 'My Prompt',
      description: 'Custom prompt description',
      type: 'text',
      content: `Custom prompt content: ${content}`
    };
  }
}

// Add to server
server.enablePrompts().addPromptGenerator('my-prompt', async () => {
  const prompt = new MyPrompt();
  return await prompt.execute('default content');
});
```

## Running Modes

### STDIO Mode

Best for Claude Desktop integration:

```bash
node dist/server.js --stdio
```

### SSE Mode

Best for web applications:

```bash
node dist/server.js --port=3000
```

## Server Configuration Options

The server builder supports various configuration options:

```typescript
const server = createMCPServer('server-name', '1.0.0')
  .description('Server description')
  .author('Your Name')
  .license('MIT')
  .enableTools({ listChanged: true })
  .enableResources({ subscribe: true, listChanged: true })
  .enablePrompts({ listChanged: true })
  .enableLogging('info')
  .enableSampling({ completions: true, chat: true })
  .enableRoots({ listChanged: true });
```

## TypeScript Configuration

Make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "target": "ES2020",
    "module": "commonjs",
    "strict": true
  }
}
```

## Error Handling

All tools automatically handle errors and return proper MCP responses. Custom error handling can be added in your `executeInternal` method:

```typescript
protected async executeInternal(parameters: Record<string, unknown>): Promise<unknown> {
  try {
    // Your logic here
    return { result: 'success' };
  } catch (error) {
    // This error will be caught by the base class and properly formatted
    throw new Error(`Tool execution failed: ${error.message}`);
  }
}
```

## Best Practices

1. **Tool Names**: Use clear, descriptive names
2. **Parameters**: Always validate input parameters
3. **Error Messages**: Provide helpful error messages
4. **Logging**: Use the built-in logger for debugging
5. **Type Safety**: Leverage TypeScript for better development experience

## Need Help?

Check out the MCP documentation and the source code for more advanced usage patterns. 