const PeopleToMarkdown = require("../src/people-to-md");
const fs = require("fs/promises");
const path = require("path");

// Mock fs/promises
jest.mock("fs/promises");

describe("PeopleToMarkdown", () => {
  let converter;
  const outputPath = "/test/output";

  beforeEach(() => {
    converter = new PeopleToMarkdown(outputPath);
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("convert", () => {
    it("should create output directory and convert all people", async () => {
      const people = [
        {
          agent: { name: "John Doe", slug: "john-doe" },
          jobTitle: "Developer",
        },
        {
          agent: { name: "Jane Smith", slug: "jane-smith" },
          jobTitle: "Designer",
        },
      ];

      await converter.convert(people);

      expect(fs.mkdir).toHaveBeenCalledWith(outputPath, { recursive: true });
      expect(fs.writeFile).toHaveBeenCalledTimes(2);
    });
  });

  describe("convertPerson", () => {
    it("should convert person data to markdown with frontmatter", async () => {
      const person = {
        agent: {
          name: "John Doe",
          slug: "john-doe",
          description: "Test description",
          memberOf: [],
        },
        jobTitle: "Developer",
      };

      await converter.convertPerson(person);

      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(outputPath, "john-doe.md"),
        expect.stringContaining("title: John Doe")
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(outputPath, "john-doe.md"),
        expect.stringContaining("Test description")
      );
    });

    it("should handle missing description", async () => {
      const person = {
        agent: {
          name: "John Doe",
          slug: "john-doe",
          memberOf: [],
        },
        jobTitle: "Developer",
      };

      await converter.convertPerson(person);

      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(outputPath, "john-doe.md"),
        expect.not.stringContaining("undefined")
      );
    });
  });

  describe("processMemberOf", () => {
    it("should process project memberships correctly", () => {
      const memberOf = [
        {
          startDate: "2023-01-01",
          endDate: "2023-12-31",
          inProject: {
            name: "Test Project",
            slug: "test-project",
            alternateName: "TP",
          },
          roleName: { name: "Developer" },
        },
      ];

      const result = converter.processMemberOf(memberOf);
      expect(result).toEqual([
        {
          startDate: "2023-01-01",
          endDate: "2023-12-31",
          project: {
            name: "Test Project",
            slug: "test-project",
            alternateName: "TP",
          },
          organisation: null,
          role: "Developer",
        },
      ]);
    });

    it("should process organisation memberships correctly", () => {
      const memberOf = [
        {
          startDate: "2023-01-01",
          endDate: "2023-12-31",
          inOrganisation: {
            agent: {
              name: "Test Org",
              slug: "test-org",
            },
          },
          roleName: { name: "Member" },
        },
      ];

      const result = converter.processMemberOf(memberOf);
      expect(result).toEqual([
        {
          startDate: "2023-01-01",
          endDate: "2023-12-31",
          project: null,
          organisation: {
            name: "Test Org",
            slug: "test-org",
          },
          role: "Member",
        },
      ]);
    });

    it("should handle null memberOf", () => {
      const result = converter.processMemberOf(null);
      expect(result).toEqual([]);
    });

    it("should handle missing optional fields", () => {
      const memberOf = [
        {
          startDate: "2023-01-01",
          // no endDate
          // no inProject
          // no inOrganisation
          // no roleName
        },
      ];

      const result = converter.processMemberOf(memberOf);
      expect(result).toEqual([
        {
          startDate: "2023-01-01",
          endDate: undefined,
          project: null,
          organisation: null,
          role: undefined,
        },
      ]);
    });
  });
});
