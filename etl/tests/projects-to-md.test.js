const ProjectsToMarkdown = require("../src/projects-to-md");
const fs = require("fs/promises");
const path = require("path");

// Mock fs/promises
jest.mock("fs/promises");

describe("ProjectsToMarkdown", () => {
  let converter;
  const outputPath = "/test/output";

  beforeEach(() => {
    converter = new ProjectsToMarkdown(outputPath);
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("convert", () => {
    it("should create output directory and convert all projects", async () => {
      const projects = [
        { name: "Project 1", slug: "project-1" },
        { name: "Project 2", slug: "project-2" },
      ];

      await converter.convert(projects);

      expect(fs.mkdir).toHaveBeenCalledWith(outputPath, { recursive: true });
      expect(fs.writeFile).toHaveBeenCalledTimes(2);
    });
  });

  describe("convertProject", () => {
    it("should convert project data to markdown with frontmatter", async () => {
      const project = {
        name: "Test Project",
        slug: "test-project",
        description: "Test description",
        foundingDate: "2023-01-01",
        creativeWorkStatus: {
          name: "Active",
          inDefinedTermSet: { name: "Status" },
        },
      };

      await converter.convertProject(project);

      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(outputPath, "2023-01-01-test-project.md"),
        expect.stringContaining("title: Test Project")
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(outputPath, "2023-01-01-test-project.md"),
        expect.stringContaining("Test description")
      );
    });
  });

  describe("data processing methods", () => {
    it("should process image data correctly", () => {
      const image = {
        filename_download: "test.jpg",
        title: "Test Image",
        description: "Test Description",
        width: 100,
        height: 200,
      };

      const result = converter.processImage(image);
      expect(result).toEqual({
        image: "test.jpg",
        title: "Test Image",
        description: "Test Description",
        width: 100,
        height: 200,
      });
    });

    it("should process funders data correctly", () => {
      const funders = [
        { agent_id: { name: "Funder 1", slug: "funder-1" } },
        { agent_id: { name: "Funder 2", slug: "funder-2" } },
      ];

      const result = converter.processFunders(funders);
      expect(result).toEqual([
        { name: "Funder 1", slug: "funder-1" },
        { name: "Funder 2", slug: "funder-2" },
      ]);
    });

    it("should process team members data correctly", () => {
      const members = [
        {
          agent: { name: "Member 1", slug: "member-1" },
          roleName: { name: "Role 1" },
        },
        {
          agent: { name: "Member 2", slug: "member-2" },
          roleName: { name: "Role 2" },
        },
      ];

      const result = converter.processTeam(members);
      expect(result).toEqual([
        { name: "Member 1", slug: "member-1", role: "Role 1" },
        { name: "Member 2", slug: "member-2", role: "Role 2" },
      ]);
    });

    it("should handle null/undefined inputs in data processing methods", () => {
      expect(converter.processImage(null)).toBeNull();
      expect(converter.processFunders(null)).toEqual([]);
      expect(converter.processKeywords(null)).toEqual([]);
      expect(converter.processUrls(null)).toEqual([]);
      expect(converter.processDepartments(null)).toEqual([]);
      expect(converter.processTeam(null)).toEqual([]);
    });
  });
});
