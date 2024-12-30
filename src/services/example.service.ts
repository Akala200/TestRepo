class ExampleService {
    public processData(data: string): string {
      return `Processed: ${data}`;
    }
  }
  
  export default new ExampleService();