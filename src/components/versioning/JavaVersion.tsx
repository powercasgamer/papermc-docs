import React, { useEffect, useState } from "react";
import { getProperty } from "../Property";
import {
  getProjectVersion,
  VersionType,
  type Project,
  type DocusaurusVersion,
} from "../../util/versionUtils";
import { useDocsVersion } from "@docusaurus/theme-common/internal";

type TargetResolver = (
  currentVersion: DocusaurusVersion | null,
  module?: string
) => Promise<string>;

const createProjectTarget = (
  project: Project,
): TargetResolver => {
  return async (currentVersion) => {
    const version = await getProjectVersion(project, currentVersion);
    return `https://jd.papermc.io/${project}/${version}`;
  };
};

const targets: { [project: string]: TargetResolver } = {
  paper: createProjectTarget("paper"),
  velocity: createProjectTarget("velocity"),
  java: async (_, module) => {
    const version = getProperty("DOCS_JAVA") ?? "21";

    return `https://docs.oracle.com/en/java/javase/${version}/docs/api/${module || "java.base"}`;
  },
  adventure: async (_, module) => {
    return `https://jd.advntr.dev/${module || 'api'}/latest`;
  }
};

const formatName = (name: string): string => {
  let [name0, hash] = name.split("#", 2);
  name0 = name0.replaceAll(".", "/").replaceAll("$", ".");

  return `${name0}.html` + (hash ? `#${hash}` : "");
};

export default function Javadoc({ name, module, project = "paper", children }: JavadocProps) {
  const [href, setHref] = useState<string>(null);

  const versionMeta = useDocsVersion();
  useEffect(() => {
    (async () => {
      const resolve = targets[project];
      if (resolve) {
        const target = await resolve(versionMeta, module);

        setHref(name ? `${target}/${formatName(name)}` : target);
      }
    })();
  }, [name]);

  return <a href={href}>{children}</a>;
}

interface JavadocProps {
  project?: Project | "java" | "adventure";
}
